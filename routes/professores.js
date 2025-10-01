const express = require('express');
const router = express.Router();


let professores = [
  {
    id: '1',
    nome: 'Carlos Andrade',
    email: 'carlos.andrade@example.com',
    cpf: '12345678999',
    curso: 'Engenharia',
    disciplina: 'Cálculo I'
  },
  {
    id: '2',
    nome: 'Ana Paula',
    email: 'ana.paula@example.com',
    cpf: '98765432111',
    curso: 'Direito',
    disciplina: 'Direito Constitucional'
  }
];


router.get('/', (req, res) => {
  res.json(professores);
});


router.get('/:id', (req, res) => {
  const prof = professores.find(p => String(p.id) === req.params.id);
  if (!prof) return res.status(404).json({ error: 'Professor não encontrado' });
  res.json(prof);
});


router.post('/', (req, res) => {
  const { nome, email, cpf, curso, disciplina } = req.body;
  if (!nome || !email || !cpf || !curso || !disciplina) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }


  const duplicado = professores.some(p => p.email === email || p.cpf === cpf);
  if (duplicado) {
    return res.status(409).json({ error: 'Email ou CPF já cadastrado' });
  }

  const id = Date.now().toString();
  const novoProf = { id, nome, email, cpf, curso, disciplina };
  professores.push(novoProf);
  res.status(201).json(novoProf);
});


router.put('/:id', (req, res) => {
  const { nome, email, cpf, curso, disciplina } = req.body;
  const idx = professores.findIndex(p => String(p.id) === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Professor não encontrado' });

  const duplicado = professores.some((p, i) => i !== idx && (p.email === email || p.cpf === cpf));
  if (duplicado) {
    return res.status(409).json({ error: 'Email ou CPF já cadastrado por outro professor' });
  }

  professores[idx] = {
    ...professores[idx],
    nome: nome ?? professores[idx].nome,
    email: email ?? professores[idx].email,
    cpf: cpf ?? professores[idx].cpf,
    curso: curso ?? professores[idx].curso,
    disciplina: disciplina ?? professores[idx].disciplina
  };

  res.json(professores[idx]);
});


router.delete('/:id', (req, res) => {
  const idx = professores.findIndex(p => String(p.id) === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Professor não encontrado' });

  const removido = professores.splice(idx, 1);
  res.json({ message: 'Professor removido', professor: removido[0] });
});

module.exports = router;