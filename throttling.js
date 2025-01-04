const api = "http://localhost:3000/"

let apiCalled;

const throttle = (fn, time) => {
    if (apiCalled) return
    apiCalled = true

    setTimeout(() => {
        fn()
        apiCalled = false
    }, time)
}

let ct = 1

const sendReq = () => {
    throttle(() => {
        fetch(api, {
            method: "GET",
        }).then((response) => {

            if (!response.ok) {
                console.log(response)
                throw new Error("Too many request from this IP, please try after sometime");
            }
            return response.json();
        })
            .then((data) => {
                document.getElementById("main-txt").innerHTML = "Request count: "
                document.getElementById("txt").innerHTML = ct++;
                console.log("Response data:", data);
            })
            .catch((error) => {
                document.getElementById("main-txt").innerHTML = "API Limit Reached. Please try again after some time."
                document.getElementById("txt").innerHTML = "";
                ct = 1

                console.error("Error:", error);
            });
    }, 500)
}