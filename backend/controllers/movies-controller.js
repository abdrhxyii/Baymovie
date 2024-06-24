const Movie = require('../model/Movie');
const awsS3config = require('../Configurations/AWSConfiguartion')
const {PutObjectCommand} = require('@aws-sdk/client-s3');

const getAllMovies = async(req, res, next) => {

  let movies;
  try {
    movies = await Movie.find();

  } catch (err) {
    console.log(err);
  }
  if (!movies) {
    return res.status(404).json({message: "No movies found"})
  }
  return res.status(200).json({movies})
};

const getByID = async (req, res, next) => {
    const id = req.params.id;
    let movie;

    try{
        movie = await Movie.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!movie) {
        return res.status(500).json({message: "No Movie Found"});
    }
    return res.status(200).json({movie});
}

const addMovie = async (req, res) => {
    const {title, director, description, genre, releaseDate} = req.body;
    const imageFile = req.file
    if (!imageFile){
        return res.status(400).json({message: "Please upload a image"})
    }

    try{
        const uniquesuffix = Date.now() + '-' + Math.random(Math.random() * 1E9);
        const filekey = `movies/${uniquesuffix}-${imageFile.originalname}`;

        const uploadparams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filekey,
            Body: imageFile.buffer,
            ContentType: imageFile.mimetype,
        };

        let putcmd = new PutObjectCommand(uploadparams)
        await awsS3config.send(putcmd);

        const newmove = await Movie.create({
            title: title,
            director: director,
            description: description,
            genre: genre,
            releaseDate: releaseDate,
            image: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${filekey}`
        })

        return res.status(201).json({newmove});

    } catch (err){
        console.log(err);
    }
}

const updateMovie = async (req, res, next) => {
    const id = req.params.id;
    const {title, director, description, genre, releaseDate, image} = req.body;
    let movie;

    try{
        movie = await Movie.findByIdAndUpdate(id, {
            title,
            director,
            description,
            genre,
            releaseDate,
            image
        });

        movie = await movie.save()

    } catch (err) {
        console.log(err);
    }
    if (!movie) {
        return res.status(404).json({message: "Unable to update by this ID"});
    }
    return res.status(200).json({movie});
}

const deleteMovie = async (req, res, next) => {
    const id = req.params.id;
    let movie;

    try {
        movie = await Movie.findByIdAndRemove(id);
    }
    catch (err) {
        console.log(err);
    }
    if (!movie) {
        return res.status(404).json({message: "Unable to delete by this ID"});
    }
    return res.status(200).json({message: "Movie successfully deleted"});
}

module.exports = {
    getAllMovies,
    addMovie,
    getByID,
    updateMovie,
    deleteMovie,
}