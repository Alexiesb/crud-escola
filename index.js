const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
// TODO: Membro 1 - Importar e mapear rota de alunos
const alunosRouter = require('./routes/alunos');
app.use('/alunos', alunosRouter);

// TODO: Membro 2 - Importar e mapear rota de professores
const professoresRouter = require('./routes/professores');
app.use('/professores', professoresRouter);

app.listen(3000, () => {
console.log('Server is running on http://localhost:3000')
})