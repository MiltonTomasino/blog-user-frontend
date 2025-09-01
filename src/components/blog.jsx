import { useState, useEffect } from "react"

function Blog() {

    const [blogs, setBlogs] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/blog")
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching blogs: ", err);
                setLoading(false)
            })
    }, [])

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <ul className="container">
                {blogs.map((blog) => {
                    return (
                        <li key={blog.id}>
                            <h2>{blog.title}</h2>
                            <p>{blog.content}</p>
                        </li>
                    );
                })}
            </ul>
        </>
    )
}

export default Blog