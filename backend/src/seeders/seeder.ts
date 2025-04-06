import axios from "axios";
import * as dotenv from "dotenv";
import { AppDataSource } from "../data-source";
import { API } from "../entity/API";

dotenv.config();

const ApiRepo = AppDataSource.getRepository(API);

interface APIDATA {
  id: number;
  name: string;
  full_name: string;
  owner: { login: string };
  created_at: string;
  updated_at: string;
  pushed_at: string;
  language: string;
}

async function APIresponce(value: string) {
  const Token = value;
  console.log(Token);

  try {
    const respose = await axios.get(
      "https://api.github.com/users/Patlu29/repos",
      {
        headers: { Authorization: `Bearer ${Token}` },
      }
    );

    const data = respose.data.map((data: APIDATA) => ({
      id: data.id,
      name: data.name,
      full_name: data.full_name,
      login: data.owner.login,
      created_at: data.created_at,
      updated_at: data.updated_at,
      pushed_at: data.pushed_at,
      language: data.language === null ? "NULL" : data.language,
    }));
    return data;
  } catch (err) {
    console.log(err);
  }
}
const PostData = async (value: string) => {
  try {
    console.log("database connected");

    const data = await APIresponce(value);
    for (const datas of data) {
      const exist = await ApiRepo.findOne({ where: { id: datas.id } });

      if (exist) {
        console.log("already exists");
        continue;
      }
      await ApiRepo.save(data);
    }
    console.log(data);

    await ApiRepo.save(data);
    return;
  } catch (err) {
    console.log(err);
  }
};

export default PostData;
