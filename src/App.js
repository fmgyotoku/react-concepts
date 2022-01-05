import React, { useState, useEffect } from "react";
import api from './services/api';
import Header from './components/Header';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repository ${Date.now()}`, 
      url: `https://www.github.com/test/${Date.now()}`, 
      techs: 'JavaScript, NodeJS, React'
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
  }

  return (
    <>
      <Header title="Repositories" />
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>{repository.title} 
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>          
          </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
