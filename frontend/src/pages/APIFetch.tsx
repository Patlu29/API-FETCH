import axios from "axios";
import { BaseSyntheticEvent, SyntheticEvent, useEffect, useState } from "react";
import '../styles/APIFetch.css'

interface APIdata {
  id: number;
  name: string;
  full_name: string;
  login: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  language: string;
}

const FlightComponent = () => {
  const [data, setData] = useState<APIdata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [full_name, setFull_name] = useState("");
  const [login, setLogin] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [updated_at, setUpdated_at] = useState("");
  const [pushed_at, setPushed_at] = useState("");
  const [language, setLanguage] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    AllApiData();
  }, []);

  const AllApiData = async () => {
    try {
      const response = await axios.get("http://localhost:3900/cd/getapi");
      const filteredData: APIdata[] = response.data.map((post: APIdata) => ({
        id: post.id,
        name: post.name,
        full_name: post.full_name,
        login: post.login,
        created_at: post.created_at,
        updated_at: post.updated_at,
        pushed_at: post.pushed_at,
        language: post.language,
      }));
      setData(filteredData);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message :"Failed to fetch data");
      setLoading(false);
    }
  };

  const updateApi = async (e:SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3900/cd/updateapi/${id}`, {
        name: name,
        full_name: full_name,
        login: login,
        created_at: created_at,
        updated_at: updated_at,
        pushed_at: pushed_at,
        language: language,
      });
      AllApiData();
      setName("");
      setFull_name("");
      setLogin("");
      setCreated_at("");
      setUpdated_at("");
      setPushed_at("");
      setLanguage("");
      setUpdate(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update data");
    }
  };

  async function deleteFlight(id: number) {
    try {
      await axios.delete(`http://localhost:3900/cd/deleteapi/${id}`);
      AllApiData();
    } catch (err) {
      setError(err instanceof Error ? err.message :  "Failed to Delete data");
    }
  }

  if (loading) return <div>Loading....</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>CD GIT API List</h2>
      <div style={{ display: "flex" }}>
        {data.length === 0 ? (
          <p>No data available.</p>
        ) : (
          <table style={{ width: "80%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th align="left">ID</th>
                <th align="left">Name</th>
                <th align="left">Full Name</th>
                <th align="left">Login Name</th>
                <th align="left">Created at</th>
                <th align="left">Updated at</th>
                <th align="left">Pushed at</th>
                <th align="left">Language</th>
                <th align="left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.full_name}</td>
                  <td>{data.login}</td>
                  <td>{data.created_at}</td>
                  <td>{data.updated_at}</td>
                  <td>{data.pushed_at}</td>
                  <td>{data.language}</td>
                  <td>
                    <button onClick={() => setUpdate(true)}>Edit</button>
                    <button onClick={() => deleteFlight(data.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div>
        {!update ? "" :
        <div style={{ width: "200px" }}>
          <form onSubmit={updateApi} style={{ justifyItems: "center" }}>
            <div>
              <h4>Update data:</h4>
            </div>
            <div>
              <label htmlFor="id">Id:</label>
              <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="full_name">Full Name: </label>
              <input
                type="text"
                value={full_name}
                onChange={(e) => setFull_name(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="login">Login name: </label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div>
              <label>Created at: </label>
              <input
                type="text"
                value={created_at}
                onChange={(e) => setCreated_at(e.target.value)}
              />
            </div>
            <div>
              <label>Updated at: </label>
              <input
                type="text"
                value={updated_at}
                onChange={(e) => setUpdated_at(e.target.value)}
              />
            </div>
            <div>
              <label>Pushed_at: </label>
              <input
                type="text"
                value={pushed_at}
                onChange={(e) => setPushed_at(e.target.value)}
              />
            </div>
            <div>
              <label>Language: </label>
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </div>
            <button type="submit">Update API</button>
          </form>
        </div>
}
      </div>
    </div>
  );
};

export default FlightComponent;
