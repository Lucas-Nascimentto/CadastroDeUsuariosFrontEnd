import './style.css';
import Trash from '../../assets/react.svg';
import api from '../../services/api';
import { useEffect, useRef, useState } from 'react';

function Home() {
  const [users, setUsers] = useState([]);
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers(){
    const myUsers = await api.get('/');
    setUsers(myUsers.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function postUsers(){
    await api.post('/', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    });
    getUsers();
  }

  
  async function deleteUsers(id){
    await api.delete(`/${id}`);
    getUsers();
  } 
  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input name='nome' type="text" placeholder="Nome" ref={inputName} />
        <input name='idade' type="number" placeholder="Idade" ref={inputAge} />
        <input name='email' type="email" placeholder="Email" ref={inputEmail} />
        <button type='button' onClick={postUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span> {user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button>
            <img src={Trash} onClick={() => deleteUsers(user.id)} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
