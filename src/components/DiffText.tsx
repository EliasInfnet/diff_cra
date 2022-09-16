import { useEffect, useState, useCallback } from 'react'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { diff_match_patch } from 'diff-match-patch'

enum optionCheckedType {
  semantic = 'semantic',
  efficiency = 'efficiency',
  raw = 'raw'
}

const dmp = new diff_match_patch();

function DiffText() {

  const [firstText, setFirstText] = useState('')
  const [secondText, setSecondText] = useState('')
  const [timeout, setTimeout] = useState(0)
  const [editcost, setEditCost] = useState(3)
  const [optionChecked, setOptionChecked] = useState(optionCheckedType.raw)
  const [time, setTime] = useState('')

  const [start, setStart] = useState(new Date().getTime())
  const [end, setEnd] = useState(new Date().getTime())

  const getTime = useCallback(() => setTime(end - start + 'ms'), [start, end])


  useEffect(() => {
    dmp.Diff_Timeout = timeout
    dmp.Diff_EditCost = editcost

    const ms_start = (new Date()).getTime();
    setStart(() => ms_start)
    const diff = dmp.diff_main(firstText, secondText);
    const ms_end = (new Date()).getTime();
    setEnd(() => ms_end)
    getTime()
    if (optionChecked === optionCheckedType.semantic) {
      dmp.diff_cleanupSemantic(diff);
    }
    if (optionChecked === optionCheckedType.efficiency) {
      dmp.diff_cleanupEfficiency(diff);
    }
    diff.forEach(n => console.log(n))
    console.log(ms_end - ms_start + 'ms')

    // document.getElementById('outputdiv').innerHTML = ds + '<BR>Time: ' + (ms_end - ms_start) / 1000 + 's';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstText, secondText, timeout, editcost, optionChecked])


  const handleChange = (e: any) => {
    console.log(e.target.value);
    setOptionChecked(() => e.target.value);
  };

  const addedPart = {
    background: '#8eff97aa'
  }

  const removedPart = {
    background: '#ff8e8eaa'
  }

  return (
    <div className="App">

      <div>
        <TextField
          id="outlined-basic"
          value={firstText}
          onChange={(e) => setFirstText(() => e.target.value)}
          variant="outlined"
          label='First Text'
          color='primary' />
        <TextField
          id="outlined-basic"
          value={secondText}
          onChange={(e) => setSecondText(() => e.target.value)}
          variant="outlined"
          label='Second Text'
          color='primary' />
      </div>
      <br />
      <div>
        <TextField
          id="outlined-basic"
          type='number'
          value={timeout}
          onChange={(e) => setTimeout(() => Number(e.target.value))}
          variant="outlined"
          label='Timeout'
          color='primary' />
        <TextField
          id="outlined-basic"
          type='number'
          value={editcost}
          onChange={(e) => setEditCost(() => Number(e.target.value))}
          variant="outlined"
          label='Edit Cost'
          color='primary' />
      </div>
      <br />
      <div>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={optionChecked}
            onChange={handleChange}
          >
            <FormControlLabel value={optionCheckedType.raw} control={<Radio />} label="Raw" />
            <FormControlLabel value={optionCheckedType.efficiency} control={<Radio />} label="Efficiency" />
            <FormControlLabel value={optionCheckedType.semantic} control={<Radio />} label="Semantic" />
          </RadioGroup>
        </FormControl>
      </div>
      <h1> Tempo do diff : {time}</h1>
    </div>
  )
}

export default DiffText