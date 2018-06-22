const axios = require('axios');

module.exports = {
    employeesOfTheCompagny : (root, args) => axios.get(`http://localhost:3000/companies/${root.id}/users`).then((response) => response.data),
    employeeCompagny : (root, args) => axios.get(`http://localhost:3000/companies/${root.companyId}`).then((response) => response.data), 
    createUser : (root, args) => axios.post(`http://localhost:3000/users/`, {firstName : args.firstName, age : args.age, companyId : args.companyId}).then((response) => response.data),
    removeUser : (root, args) => axios.delete(`http://localhost:3000/users/${args.id}`).then((response) => response.data),
    findOneUser : (root, args) => axios.get(`http://localhost:3000/users/${args.id}`).then((response) => response.data),
    findOneCompagny : (root, args) => axios.get(`http://localhost:3000/companies/${args.id}`).then((response) => response.data)
}
