export const getData = (req, res) => {
    try {
        
    } catch (error) {
        console.log("internal server error", error);
        res.status(500, error)
        
    }
}