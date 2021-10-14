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

  useEffect(()=>{
    setFilteredList( filterListByMonth(list, currentMonth) );
    console.log( filterListByMonth(list, currentMonth) )

  }, [list, currentMonth]);

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
        />
        {/*area de inserção de informação*/ }
        <TableArea list={filteredList}/>
      </C.Body>
    </C.Container>
  );
}

export default App;
