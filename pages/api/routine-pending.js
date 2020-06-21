export default (req, res) => {
  res.statusCode = 200
  res.json([
    { 
      type: "fake",
      id: "ID",
      date: "Data",
      description: "Descrição"
    },
    { 
      type: "align",
      id: "center",
      date: "center",
      description: "left",
    }
    ,
    {
      type: "data", 
      id: 5,
      date: "17/06/2020 23:05",
      description: "ESCOVAR OS DENTES"
    },
    { 
      type: "data",
      id: 6,
      date: "17/06/2020 21:05",
      description: "FAZER TAREFA DA ESCOLA"
    },
    { 
      type: "data",
      id: 7,
      date: "17/06/2020 18:05",
      description: "AJUDAR A MÃE EM ALGUMA TAREFA"
    }
  ])
}
