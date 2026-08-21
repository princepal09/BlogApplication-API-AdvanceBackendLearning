import { app } from "./app.js";
import { PORT } from "./config/config.js";



app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT ${PORT}`)
})