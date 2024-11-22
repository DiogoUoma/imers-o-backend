import express from "express";
import multer from "multer";
import {
  listarPosts,
  postarNovoPost,
  uploadImagem,
  atualizarNovoPost,
} from "../controllers/postController.js";
import cors from "cors";

const corsOption = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

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

  app.use(cors(corsOption));
  //rota para listar todos os posts
  app.get("/posts", listarPosts);
  //rota para criar novo post
  app.post("/posts", postarNovoPost);
  //rota para realizar o upload
  app.post("/upload", upload.single("imagem"), uploadImagem);
  //rota para realizar o put
  app.put("/upload/:id", atualizarNovoPost);
};

export default routes;
