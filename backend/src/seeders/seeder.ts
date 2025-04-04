import axios from "axios";
import * as dotenv from "dotenv";
import { Response } from "express";
import { AppDataSource } from "../data-source";
import { API } from "../entity/API";

dotenv.config();

const ApiRepo = AppDataSource.getRepository(API);

interface APIDATA {
  name: string;
  full_name: string;
  owner: { login: string };
  created_at: string;
  updated_at: string;
  pushed_at: string;
  language: string;
}

async function APIresponce() {
  const token = process.env.GIT_TOKEN;
  try {
    const respoce = await axios.get(
      "https://api.github.com/orgs/crystaldelta/repos",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = respoce.data.map((data: APIDATA) => ({
      name: data.name,
      full_name: data.full_name,
      login: data.owner.login,
      created_at: data.created_at,
      updated_at: data.updated_at,
      pushed_at: data.pushed_at,
      language: data.language === null ? "NULL" : data.language,
    }));
    return data;

    //   res.status(200).json({ message: "data fetched" });
  } catch (err) {
    console.log(err);
  }
}
const PostData = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("database connected");

    const data = await APIresponce();
    for (const datas of data) {
      const exist = await ApiRepo.findOne({ where: { id: data.id } });

      if (exist) {
        console.log("already exists");
        continue;
      }
      await ApiRepo.save(data);
    }

    await ApiRepo.save(data);
    return;
  } catch (err) {
    console.log(err);
  }
};

PostData();
