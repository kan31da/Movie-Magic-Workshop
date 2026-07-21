import z from "zod"

export const getErrorMessage = (error) => {
    let errorMessage = null;

    if (error.name === 'ZodError') {
        const errors = z.flattenError(error).fieldErrors;

        errorMessage = Object.values(errors).flat().at(0) || 'Invalid input';

        // errorMessage = Object.values(errors).flat();
    }
    else if (error.name === 'PrismaClientKnownRequestError') {

        errorMessage = `Database error happened: Code ${error.code}`;
        // error = er.message || 'An unexpected error occurred';
    }
    else {
        errorMessage = error.message || 'An unexpected error occurred';
    }

    return errorMessage;
}