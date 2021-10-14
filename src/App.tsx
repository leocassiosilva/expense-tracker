import * as C from './App.styles'
import {Item} from './types/Item';
import {Category} from './types/Category';
import {categories} from './data/categories';
import {items} from './data/items';
import { useState, useEffect } from 'react';
import {getCurrentMonth, filterListByMonth} from './helpers/dateFilter'
import {TableArea} from './components/TableArea';
import { InfoArea } from './components/InfoArea'



const App = () => {

  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  
  useEffect(()=>{
    setFilteredList( filterListByMonth(list, currentMonth) );
    console.log( filterListByMonth(list, currentMonth) )

  }, [list, currentMonth]);


  useEffect(()=>{
    let incomeCount = 0;
    let expenseCount = 0; 

    for (let i in filteredList){
      if(categories[filteredList[i].category].expense){
        expenseCount+=filteredList[i].value;
      }else {
        incomeCount+=filteredList[i].value;
      }
    }

    setExpense(expenseCount);
    setIncome(incomeCount);
  }, [filteredList]);

  const hadleMonthChange = (newMonth: string) =>{
    setCurrentMonth(newMonth);
  }
 
  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema Finaceiro</C.HeaderText>
      </C.Header>
      <C.Body>
        <InfoArea 
          currentMonth={currentMonth}
          onMonthChange={hadleMonthChange}
          income={income}
          expense={expense}
        />
        {/*area de inserção de informação*/ }
        <TableArea list={filteredList}/>
      </C.Body>
    </C.Container>
  );
}

export default App;
