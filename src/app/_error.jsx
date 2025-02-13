export default function CustomError({ statusCode }) {
    return <h1>{statusCode ? `Error ${statusCode}` : "An error occurred"}</h1>;
}
