const users = [
    {
        id: "1",
        fullName: "Furkan Boncuk"
    },
    {
        id: "2",
        fullName: "Deneme Kullanıcısı"
    }
]

const posts = [
    {
        id: "1",
        title: "Furkan'ın Gönderisi",
        user_id: "1"
    },
    {
        id: "2",
        title: "Furkan'ın Diğer Gönderisi",
        user_id: "1"
    },
    {
        id: "3",
        title: "Deneme Kullanıcısının Gönderisi",
        user_id: "2"
    },
]

const comments = [
    {
        id: "1",
        text: "Deneme Kullanıcısının Yorumu",
        post_id: "1",
        user_id: "2"
    },
    {
        id: "2",
        text: "Furkan Boncuk'un Yorumu",
        post_id: "1",
        user_id: "1"
    },    
    {
        id: "3",
        text: "Deneme Kullanıcısının Diğer Bir Yorumu",
        post_id: "2",
        user_id: "2"
    },    {
        id: "4",
        text: "Furkan Boncuk'un Diğer Bir Yorumu",
        post_id: "3",
        user_id: "1"
    }
]

module.exports = {users, comments, posts}