//Declaring the array of objects
const employees = [
    { name: "John Doe", age: 30, department: "HR", salary: 50000 },
    { name: "Jane Smith", age: 28, department: "Finance", salary: 60000 },
    { name: "Alex Johnson", age: 35, department: "IT", salary: 70000 },
  ];
  
  //Declaring the function to find the highest paid employee
  function highestPaid(array){
    var highest_salary = 0
    var res;
    array.forEach(element => {
      const {salary} = element
      if (salary > highest_salary){
        highest_salary = element.salary
        res = element
      }
    });
    return res
  }
  
  //Invoking the function highestPaid()
  console.log(highestPaid(employees));
  
  //Declaring the function to swap first and last elements and returning array
  const destructuringToSwap = function(array){
    var temp = array[0]
    array[0] = array[array.length - 1]
    array[array.length - 1] = temp
    return array
  }
  
  //Invoking the function destructuringToSwap()
  console.log(destructuringToSwap(employees));