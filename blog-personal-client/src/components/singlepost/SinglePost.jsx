import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import './singlepost.css';
import { Context } from '../../context/Context';

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [post, setPost] = useState({});
    const PF = 'http://localhost:5000/images/';
    const { user } = useContext(Context);
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get('/api/posts/' + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDescription(res.data.description);
            setCategories(res.data.categories);
        };
        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/posts/${post._id}`, {
                data: { username: user.username },
            });
            window.location.replace('/');
        } catch (err) {
            console.log('Error when deleting post', err);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/posts/${post._id}`, {
                username: user.username,
                title,
                description,
                categories,
            });
            setUpdateMode(false);
        } catch (err) {}
    };

    //console.log(categories);

    const handleSelectChange = (event) => {
        const selectedCategory = event.target.value;
        if (!categories.includes(selectedCategory) && selectedCategory != '') {
            const newCategories = [...categories, selectedCategory];
            setCategories(newCategories);
        }
    };

    const handleSelectDelete = (e) => {
        if (categories.includes(e)) {
            setCategories(
                categories.filter((cat) => {
                    return cat !== e;
                }),
            );
        }
    };

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && <img className="singlePostImg" src={PF + post.photo} alt="" />}
                {updateMode ? (
                    <input
                        type="text"
                        value={title}
                        className="singlePostTitleInput"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <h1 className="singlePostTitle">
                        {title}
                        {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <i
                                    className="singlePostIcon fa-regular fa-pen-to-square "
                                    onClick={() => setUpdateMode(true)}
                                ></i>
                                <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                            </div>
                        )}
                    </h1>
                )}
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author :
                        <Link to={`/?user=${post.username}`} className="link">
                            <b> {post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? (
                    <textarea
                        className="singlePostDescriptionInput"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                ) : (
                    <p className="singlePostDescription">{description}</p>
                )}

                <div className="singlePostEnd">
                    <div className="singlePostCategories">
                        {updateMode && (
                            <>
                                <select className="categoriesSelect" name="" onChange={(e) => handleSelectChange(e)}>
                                    <option value="">--Add Category--</option>
                                    <option value="Music">Music</option>
                                    <option value="Sport">Sport</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                    <option value="Ranking">Ranking</option>
                                    <option value="Game">Game</option>
                                    <option value="Mystery">Mystery</option>
                                </select>
                                {/* <select className="categoriesSelect" name="" onChange={(e) => handleSelectDelete(e)}>
                                    <option value="">--Delete Category--</option>
                                    <option value="Music">Music</option>
                                    <option value="Sport">Sport</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                    <option value="Ranking">Ranking</option>
                                    <option value="Game">Game</option>
                                    <option value="Mystery">Mystery</option>
                                </select> */}
                            </>
                        )}
                        <ul className="singlePostCategoriesList">
                            About :
                            {categories.map((c, index) => (
                                <span className="categoriesItem" key={index}>
                                    {c}
                                    {updateMode && (
                                        <button
                                            type="submit"
                                            className="categoriesItemButton"
                                            onClick={() => handleSelectDelete(c)}
                                        >
                                            X
                                        </button>
                                    )}
                                </span>
                            ))}
                        </ul>
                    </div>

                    {post.username === user?.username && updateMode && (
                        <button className="singlePostButton" onClick={handleUpdate}>
                            Update
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
