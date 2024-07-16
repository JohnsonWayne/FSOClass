function Filter(props) {
	return (
		<label>Find countries by name: 
            <input 
                type='text' 
                value={props.search} onChange={(e) => 
                    props.setSearch(e.target.value)} 
            />
        </label>
	);
}

export default Filter;