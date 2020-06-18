export default (req, res) => {
  res.statusCode = 200
  res.json([
    { 
      type: "fake",
      id: "ID",
      descricao: "DESCRIÇÃO",
      disponivel: "DISPONÍVEL (CAIXAS)" 
    },
    { 
      type: "align",
      id: "center",
      descricao: "left",
      disponivel: "right" 
    }
    ,
    {
      type: "data", 
      id: 9825,
      descricao: "CANECA 200 ML BRANCA",
      disponivel: 50 
    },
    { 
      type: "data",
      id: 9826,
      descricao: "CANECA 300 ML BRANCA",
      disponivel: 70 
    },
    { 
      type: "data",
      id: 9820,
      descricao: "CANECA 200 ML DECORADA",
      disponivel: 40 
    }
  ])
}
