class HTTPWorker {

    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error(resp.statusText)
                } else {return resp}
            })
            .then(resp => resp.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
        })
    }
}