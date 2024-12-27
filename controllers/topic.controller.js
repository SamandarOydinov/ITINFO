const { errorHandler } = require("../helpers/error_Handler")

const getAllTopics = async (req, res) => {
    try {
        const topics = await Top
    } catch (error) {
        errorHandler(error, res)
    }
}