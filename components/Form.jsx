const Form = ({ setPost, post, handleSubmit, title, content, name }) => {
  return (
    <>
      <h2 className="text-center text-2xl font-semibold text-gray-600">
        {name}
      </h2>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="">
            Title
          </label>
          <input
            className="form-input"
            placeholder="title"
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
          <label className="form-label" htmlFor="">
            Content
          </label>
          <textarea
            className="form-input"
            placeholder="content"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
          <button
            type="submit"
            className="py-2 px-2 rounded-lg bg-blue-100 text-black"
          >
            {name}
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
