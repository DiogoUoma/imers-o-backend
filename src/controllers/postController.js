import fs from "fs";
import {
  getTodosOsPosts,
  criarPost,
  atualizarPost,
} from "../models/postModel.js";

import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
  const posts = await getTodosOsPosts();
  res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
  const novoPost = req.body;
  try {
    const postCriado = await criarPost(novoPost);
    res.status(200).json(postCriado);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Erro: "Falha na requisisção" });
  }
}

export async function uploadImagem(req, res) {
  const novoPost = req.body;
  try {
    const postCriado = await criarPost(novoPost);
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imagemAtualizada);
    res.status(200).json(postCriado);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Erro: "Falha na requisisção" });
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImage = `http://localhost/3000/${id}.png`;

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    const post = {
      imgUrl: urlImage,
      descricao: descricao,
      alt: req.body.alt,
    };

    const postCriado = await atualizarPost(id, post);

    res.status(200).json(postCriado);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Erro: "Falha na requisisção" });
  }
}
