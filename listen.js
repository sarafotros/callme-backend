const PORT = process.env.PORT || 9090;

// const { PORT = 9090 } = process.env;
const app = require("./server")

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
