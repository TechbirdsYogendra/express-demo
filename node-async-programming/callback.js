// Callback Hell Example
// getUser(1, (user) => {
//     console.log("User:", user);
//     getPosts(user.id, (posts) => {
//         console.log("Posts for User " + user.id + ":", posts);
//         getComments(posts[0].id, (comments) => {
//             // Callback Hell / Pyramid of Doom
//             console.log("Comments for Post " + posts[0].id + ":", comments);
//         });
//     });
// });

// // Simulated asynchronous function using a callback
// function getUser(id, callback) {
//     setTimeout(() => {
//         callback({ id: id, name: "User" + id });
//     }, 2000);
// }

// function getPosts(userId, callback) {
//     setTimeout(() => {
//         callback([
//             { id: 1, userId: userId, title: "Post 1" },
//             { id: 2, userId: userId, title: "Post 2" },
//             { id: 3, userId: userId, title: "Post 3" },
//             { id: 4, userId: userId, title: "Post 4" },
//             { id: 5, userId: userId, title: "Post 5" }
//         ]);
//     }, 2000);
// }
// function getComments(postId, callback) {
//     setTimeout(() => {
//         callback([
//             { id: 1, postId: postId, content: "Comment 1" },
//             { id: 2, postId: postId, content: "Comment 2" },
//             { id: 3, postId: postId, content: "Comment 3" },
//             { id: 4, postId: postId, content: "Comment 4" },
//             { id: 5, postId: postId, content: "Comment 5" },
//             { id: 6, postId: postId, content: "Comment 6" }
//         ]);
//     }, 2000);
// }


// Note: To avoid callback hell, consider using Promises or async/await in real applications.

// Refactored using Promises and async/await (for comparison)
async function fetchUserData(userId) {
    try {
        let user = await getUserPromise(userId);
        console.log("User:", user);
        let posts = await getPostsPromise(user.id);
        console.log("Posts for User " + user.id + ":", posts);
        let comments = await getCommentsPromise(posts[0].id);
        console.log("Comments for Post " + posts[0].id + ":", comments);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Refactored using Promises
// This function fetches user data, posts, and comments using Promises to avoid callback hell
function fetchUserDataUsingThen(userId) {
    getUserPromise(userId)
        .then(user => {
            console.log("User:", user);
            return getPostsPromise(user.id);
        })
        .then(posts => {
            console.log("Posts for User " + posts[0].userId + ":", posts);
            return getCommentsPromise(posts[0].id);
        })
        .then(comments => {
            console.log("Comments for Post " + comments[0].postId + ":", comments);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function getUserPromise(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: id, name: "User" + id });
        }, 2000);
    });
}

function getPostsPromise(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, userId: userId, title: "Post 1" },
                { id: 2, userId: userId, title: "Post 2" },
                { id: 3, userId: userId, title: "Post 3" },
                { id: 4, userId: userId, title: "Post 4" },
                { id: 5, userId: userId, title: "Post 5" }
            ]);
        }, 2000);
    });
}

function getCommentsPromise(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, postId: postId, content: "Comment 1" },
                { id: 2, postId: postId, content: "Comment 2" },
                { id: 3, postId: postId, content: "Comment 3" },
                { id: 4, postId: postId, content: "Comment 4" },
                { id: 5, postId: postId, content: "Comment 5" },
                { id: 6, postId: postId, content: "Comment 6" }
            ]);
        }, 2000);
    });
}

// Call the refactored function
fetchUserData(1);