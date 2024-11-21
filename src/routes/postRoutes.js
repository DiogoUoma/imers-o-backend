import express from "express";
import multer from "multer";
import {
  listarPosts,
  postarNovoPost,
  uploadImagem,
} from "../controllers/postController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
  app.use(express.json());
  //rota para listar todos os posts
  app.get("/posts", listarPosts);
  //rota para criar novo post
  app.post("/posts", postarNovoPost);
  //rota para realizar o upload
  app.post("/upload", upload.single("imagem"), uploadImagem);
};

export default routes;
