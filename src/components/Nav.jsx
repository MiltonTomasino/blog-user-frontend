
function Nav() {
    return (
        <nav>
        <h1>Milton's Blog</h1>
        <div className="nav-buttons">
            <form action="http://localhost:3000/user/logout" method="POST">
                <button>log out</button>
            </form>
        </div>
    </nav>
    )
}

export default Nav