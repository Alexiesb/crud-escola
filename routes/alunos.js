const express = require('express');
const router = express.Router();

let alunos = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao.silva@example.com',
    cpf: '12345678901',
    telefone: '11999998888',
    dataNascimento: '2000-05-20'
  },
  {
    id: '2',
    nome: 'Maria Souza',
    email: 'maria.souza@example.com',
    cpf: '98765432100',
    telefone: '21988887777',
    dataNascimento: '1999-09-10'
  }
];


router.get('/', (req, res) => {
  res.json(alunos);
});


router.get('/:id', (req, res) => {
  const aluno = alunos.find(a => String(a.id) === String(req.params.id));
  if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
  res.json(aluno);
});


router.post('/', (req, res) => {
  const { nome, email, cpf, telefone, dataNascimento } = req.body;
  if (!nome || !email || !cpf) {
    return res.status(400).json({ error: 'Campos obrigatórios: nome, email, cpf' });
  }

  const duplicado = alunos.some(a => a.email === email || a.cpf === cpf);
  if (duplicado) {
    return res.status(409).json({ error: 'Email ou CPF já cadastrado' });
  }

  const id = Date.now().toString(); 
  const novoAluno = { id, nome, email, cpf, telefone: telefone || '', dataNascimento: dataNascimento || '' };
  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});


router.put('/:id', (req, res) => {
  const { nome, email, cpf, telefone, dataNascimento } = req.body;
  const idx = alunos.findIndex(a => String(a.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Aluno não encontrado' });


  const duplicado = alunos.some((a, i) => i !== idx && (a.email === email || a.cpf === cpf));
  if (duplicado) {
    return res.status(409).json({ error: 'Email ou CPF já cadastrado por outro aluno' });
  }

  alunos[idx] = {
    ...alunos[idx],
    nome: nome ?? alunos[idx].nome,
    email: email ?? alunos[idx].email,
    cpf: cpf ?? alunos[idx].cpf,
    telefone: telefone ?? alunos[idx].telefone,
    dataNascimento: dataNascimento ?? alunos[idx].dataNascimento
  };

  res.json(alunos[idx]);
});


router.delete('/:id', (req, res) => {
  const idx = alunos.findIndex(a => String(a.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Aluno não encontrado' });

  const removido = alunos.splice(idx, 1);
  res.json({ message: 'Aluno removido', aluno: removido[0] });
});

module.exports = router;
