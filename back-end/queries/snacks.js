
const db = require("../db/dbConfig.js");

const getAllSnacks = async() => {
    try{
        const allSnacks = await db.any('SELECT * FROM snacks');
        return allSnacks;
      }  catch(error) {
            return error;
        }
    }
    
    const getSnack = async(id)=>{
        try{
            const oneSnack = await db.one(
                "SELECT * FROM snack WHERE id=$1",
                id
            );
            return oneSnack;
        } catch(error){
            return error;
        }
    }

const createSnack = (snack) => {
    try{
        const newSnack = await db.one(
            "INSERT INTO snacks (name, fiber, protein, added_sugar, is_healthy) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [snack.name, snack.fiber, snack.protein, snack.added_sugar, snack.is_healthy]
        )
        return newSnack;
    } catch(error) {
        return error;
    }
    }

const deleteSnack = async (id) => {
    try {
        const deletedSnack = await db.one(
            "DELETE FROM snacks WHERE id = $1 RETURNING *",
            id
        );
        return deletedSnack;
    } catch (error) {
        return error;
    }
}

const updateSnack = async (id, snack) => {
    try {
        const updatedSnack = await db.one(
            "UPDATE snacks SET name=$1, fiber=$2, protein=$3, added_sugar=$4, is_healthy=$5, WHERE id=$6 RETURNING *",
            [snack.name, snack.fiber, snack.protein, snack.added_sugar, snack.is_healthy, id]
        );
        return updatedSnack;
    } catch (error) {
        return error;
    }
}

module.exports = {
getAllSnacks,
getSnack,
createSnack,
deleteSnack,
updateSnack,
};
