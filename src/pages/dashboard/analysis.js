import router from 'umi/router';
import { Button, Card } from 'antd';
import { connect } from 'dva';
import WeekStatistics from '@/components/dashboard/WeekStatistics'

function Analysis({
	dispatch,
	count
}) {

	const add = () => {
		dispatch({
			type: 'analysis/countAdd'
		})
	}

  const down = () => {
    dispatch({
      type: 'analysis/countDown'
    })
  }

	return (
		<Card bordered={ false }>
	    <h1>Dashboard Analysis Page</h1>
			<span style={{ color: 'green' }}>{ count }</span>
	    <Button type="primary" onClick={() => {
	      router.goBack();
	    }}>Back</Button>
			<Button onClick={ add }>Add</Button>
			<Button onClick={ down } className="fr">Down</Button>
      <WeekStatistics
      />
	  </Card>
	)
}

function mapStateToProps(state) {
	const { count } = state.analysis;
	return {
		count
	}
}

export default connect(mapStateToProps)(Analysis);
