import { useState, useEffect } from "react"
import "../styles/blog.css";
import Nav from "./Nav";
import Pagination from "./Pagination";

function formatDate(blog) {
    const createdAt = new Date(blog.createdAt);
    const now = new Date();
    const diffMs = now - createdAt;
    const diffHrs = diffMs / (1000 * 60 * 60);
    const diffMins = diffMs /(1000 * 60);
    let formattedDate;
    if (diffHrs > 24) {
        formattedDate = createdAt.toLocaleString("en-us", {
            year: "2-digit",
            month: "numeric",
            day: "numeric",
        });
    } else if (diffHrs > 0 && diffHrs < 1){
        formattedDate = `${Math.floor(diffMins)}m`
    } else {
        formattedDate = `${Math.floor(diffHrs)}h`;
    }
    return {...blog, formattedDate };
}


function Blog() {

    const [blogs, setBlogs] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [openComments, setOpenComments] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    function commentToggles(id) {
        setOpenComments(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const loadBlogs = (page) => {
        setLoading(true);
        fetch(`http://localhost:3000/blog?page=${page}`, {
            method: "GET",
            credentials: "include"
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.blogs);
            setBlogs(data.blogs);
            setTotalPages(data.totalPages);
            setCurrentPage(page);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching blogs: ", err);
            setLoading(false)
        })
    }

    async function submitComment(e, blogId) {
        e.preventDefault();

        const comment = e.target.comment.value;
        console.log("Comment: ", comment);
        

        await fetch(`http://localhost:3000/blog/${blogId}/comments?source=react`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ comment: comment })
        });
        e.target.reset()
        loadBlogs(currentPage);
    }

    useEffect(() => {
        loadBlogs(1);
    }, [])


    if (loading) return <p>Loading...</p>;

    return (
        <div className="blog-container">
            <Nav />
            <ul className="blogs-list">
                {blogs.map(blog => {
                    blog = formatDate(blog);
                    const isOpen = !!openComments[blog.id]
                    return (
                        <li key={blog.id} className="blog">
                            <div className="blog-content">
                                <div className="info">
                                    <strong>{blog.title}</strong>
                                    <span>
                                        <small> {blog.formattedDate}</small>
                                    </span>
                                </div>
                                <div className="text">{blog.content}</div>
                            </div>


                            <div className="comments">
                                <div className="comments-tab" onClick={() => commentToggles(blog.id)}>
                                    {isOpen ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="tab-closed" viewBox="0 0 24 24">
                                            <title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="tab-open" viewBox="0 0 24 24">
                                            <title>chevron-right</title><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                        </svg>
                                    )}
                                </div>
                                
                                {isOpen && (
                                    <div className="comments-container">
                                        <div className="comments-list">
                                            {blog.comments && blog.comments.length > 0
                                                ? blog.comments.map(comment => {
                                                    return (
                                                        <div className="comment" key={comment.id}>
                                                            {comment.user.username}: <em>{comment.text}</em>
                                                        </div>
                                                    )
                                                })
                                                : <div className="no-comments">No comments.</div>
                                            }
                                        </div>
                                        <div className="add-comment">
                                            <form onSubmit={(e) => submitComment(e, blog.id)}>
                                                <input type="text" name="comment" placeholder="Add a comment..." />
                                                <label htmlFor="comment"><button type="submit">comment</button></label>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </li>
                    )
                })}
            </ul>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={loadBlogs}
            />
        </div>
    )
}

export default Blog