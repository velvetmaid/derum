export default function Album({ posts }) {
    return (
        <>
            {posts.map((post) => {
                return (
                    <>
                        <div key={post.id}>
                            <span>{post.album_title}</span>
                        </div>
                    </>
                );
            })}
        </>
    );
}
