import { useState, useEffect } from "react"
import "../styles/blog.css";

function Blog() {

    const [blogs, setBlogs] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/blog")
            .then((res) => res.json())
            .then(async (data) => {
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

                    const createdAt = new Date(blog.createdAt);
                    const now = new Date();
                    const diffMs = now - createdAt ;
                    const diffHrs = diffMs / (1000 * 60 * 60);
                    let formattedDate;

                    if (diffHrs > 24) {
                        formattedDate = createdAt.toLocaleString("en-US", {
                            year: "2-digit",
                            month: "numeric",
                            day: "numeric"
                        })
                    } else {
                        const hrsAge = Math.floor(diffHrs);
                        formattedDate = `${hrsAge}h`
                    }                

                    console.log(blog);
                    

                    return (
                        <li key={blog.id} className="blog">
                            <h2 className="title">{blog.title}</h2>
                            <p className="content">{blog.content}</p>
                            <small className="info">{formattedDate}</small>

                            <ul className="comments">
                                {blog.comments.length > 0 ? (
                                    blog.comments.map((comment) => (
                                        <li key={comment.id}>{comment.user.username}: {comment.text}</li>
                                    ))
                                ) : (
                                    <li>No comments</li>
                                )}
                            </ul>

                        </li>
                    );
                })}
            </ul>
        </>
    )
}

export default Blog