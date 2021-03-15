// use https (http secure).
// http (non secure) will make the app complain about mixed content when running the app from Azure
const baseUrl = "https://anbo-bookstorerest.azurewebsites.net/api/books"

Vue.createApp({
    data() {
        return {
            books: [],
            bookId: null,
            singleBook: null,
            addData: { title: "", author: "", publisher: "", price: 0 },
            addMessage: "",
            idToDelete: null,
            deleteMessage: "",
            idToUpdate: null,
            updateData: {title: "", author: "", publisher: "", price: 0 },
            updateMessage: ""
        }
    },
    async created() { // life cycle method. Called when browser reloads page
        try {
            const response = await axios.get(baseUrl)
            this.books = await response.data
            console.log(this.books)
        } catch (ex) {
            alert(ex.message) // https://www.w3schools.com/js/js_popup.asp
        }
    },
    methods: {
        async getBookById(id) {
            const url = baseUrl + "/" + id
            try {
                const response = await axios.get(url)
                this.singleBook = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async deleteBookById(idToDelete) {
            const url = baseUrl + "/" + idToDelete
            try {
                response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllBooks()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async addBook() {
            console.log(this.addData)
            try {
                response = await axios.post(baseUrl, this.addData)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.getAllBooks()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async updateBook() {
            console.log(this.updateData)
            const url = baseUrl + "/" + this.idToUpdate
            try {
                response = await axios.put(url, this.updateData)
                this.updateMessage = "response " + response.status + " " + response.statusText
                this.getAllBooks()
            } catch (ex) {
                alert(ex.message)
            } 
        }
    }
}).mount("#app")