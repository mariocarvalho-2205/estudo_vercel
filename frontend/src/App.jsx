import "./App.css";
import { useState } from "react";
import api from "./services/api";

function App() {
	const [nome, setNome] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const response = await api.post("/user/register", { nome });
			console.log(response.data.message, "response front");
      setNome("")
		} catch (error) {
			console.error("Erro ao salvar:", error);
			if (error.response) {
				// O servidor respondeu com um status fora do range 2xx
				console.error("Erro de resposta:", error.response.data);
				console.error("Status:", error.response.status);
				console.error("Headers:", error.response.headers);
			} else if (error.request) {
				// A requisição foi feita mas não houve resposta
				console.error("Erro de requisição:", error.request);
			} else {
				// Outros erros
				console.error("Erro:", error.message);
			}
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="nome">Nome do Aluno:</label>
					<input
						id="nome"
						type="text"
						name="nome"
						value={nome}
						onChange={(e) => setNome(e.target.value)}
						placeholder="Nome"
					/>
				</div>
				{nome}
				<button type="submit" value="enviar">
					Enviar
				</button>
			</form>
		</>
	);
}

export default App;
