const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
// TODO: Membro 1 - Importar e mapear rota de alunos

// TODO: Membro 2 - Importar e mapear rota de professores

app.listen(3000, () => {
console.log('Server is running on http://localhost:3000')
})