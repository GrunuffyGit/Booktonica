export function getAllBooks() {
  return fetch("/books", {
    headers: {
      // This header is needed or React app won't proxy it along to Express
      Accept: "application/json"
    }
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error(
        `😩 fetch('/books') failed: Express server responded with HTTP ${resp.status} ${resp.statusText}. (Note: this error is custom to Booktonica and you cannot Google it). Check your Network console for more information about the request and the Express logs for more information about the response.`
      );
    }
  });
}

export function hasUser(username) {
//return true or false if user exists in db
  console.log(username);
  return fetch(`/check_user_exist/${username}`, {
    headers: {
      Accept: "application/json"
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Unexpected non-OK HTTP status: /check_user_exist/${username}`);
    }
  });
}

export function getUserId(username) {
  //grab all data of the user
    return fetch(`/userid/${username}`, {
      headers: {
        Accept: "application/json"
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Unexpected non-OK HTTP status: /userid/${username}`);
      }
    });
  }

export function getUserInfo(id) {
//grab all data of the user
  return fetch(`/userInfo/${id}`, {
    headers: {
      Accept: "application/json"
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Unexpected non-OK HTTP status: /userInfo/${id}`);
    }
  });
}

export function getList(id) {
//grab all list created by user id (for dropdown)
  return fetch(`/lists/${id}`, {
    headers: {
      Accept: "application/json"
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Unexpected non-OK HTTP status: /lists/${id}`);
    }
  });
}

export function hasUserLogin(id) {
//checking if user is logged in through db
  return fetch(`/check_log/${id}`, {
    headers: {
      Accept: "application/json"
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Unexpected non-OK HTTP status: /check_log/${id}`);
    }
  });
}

export function hasUserPass(userPassJson) {
  //creating a user
    return fetch("/has_user_pass", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userPassJson)
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Unexpected non-OK HTTP status: POST /has_user_pass");
      }
    });
  }

export function createUser(userJson) {
//creating a user
  return fetch("/add_user", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userJson)
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Unexpected non-OK HTTP status: POST /add_user");
    }
  });
}

export function createList(listJson) {
//creating a list
  console.log(listJson)
  return fetch("/add_list", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(listJson)
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Unexpected non-OK HTTP status: POST /add_list");
    }
  });
}

export function addBookToList(bookJson) {
//adding a book to the list by adding a new row with vlaues(list id and book id)
  return fetch("/add_book", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bookJson)
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Unexpected non-OK HTTP status: POST /add_book");
    }
  });
}

export function loginUser(userId) {
//logging user in by adding id to log in table
  return fetch(`/log_user_in/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json"
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Unexpected non-OK HTTP status: POST /log_user_in/${userId}`);
    }
  });
}

export function deleteList(id) {
  return fetch(`/remove_list/${id}`, {
    method: "DELETE"
  }).then(res => {
    if (res.ok) {
    } else {
      throw new Error(`Unexpected non-OK HTTP status: DELETE /remove_list/${id}`);
    }
  });
}
export function deleteBookFromList(id) {
  return fetch(`/remove_book_from_list/${id}`, {
    method: "DELETE"
  }).then(res => {
    if (res.ok) {
    } else {
      throw new Error(`Unexpected non-OK HTTP status: DELETE /remove_book_from_list/${id}`);
    }
  });
}
export function logoutUser(id) {
  return fetch(`/log_user_out/${id}`, {
    method: "DELETE"
  }).then(res => {
    if (res.ok) {
    } else {
      throw new Error(`Unexpected non-OK HTTP status: DELETE /log_user_out/${id}`);
    }
  });
}
