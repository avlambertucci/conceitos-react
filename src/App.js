import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response=>{
      setRepositories(response.data)
      console.log(response)
    })
  }, []);

  async function handleAddRepository() {

    
    
    const repository = await api.post('/repositories', {
      title: `Armando`,
      url: `http://www.teste.com.br`,
      techs: ['Node', 'React']
    })
    setRepositories([...repositories, repository.data])
    
  }
  
  async function handleRemoveRepository(id) {
    console.log(id)
      await api.delete(`/repositories/${id}`)
      
      setRepositories(repositories.filter(
        repository=> repository.id != id 
      ))

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository=>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
