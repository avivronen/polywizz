import React, { Component } from 'react';
import {CssBaseline} from "@material-ui/core";
import axios from "axios";
import SimpleTable from "../../UI/SimpleTable/SimpleTable";
//import Spinner from "../../UI/Spinner/Spinner";
import classes from "../../UI/Search/Search.module.css";
import SearchIcon from "@material-ui/icons/Search";
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button'
import {updateObject} from '../../shared/utility'

class Search extends Component {

    state = {
        repos: null,
        search: {
            keyword: {value: ''},
            user: {value: ''},
            language: {value: ''},
        },
        search_valid: false
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedSearchElement = updateObject(this.state.search[inputIdentifier], {
            value: event.target.value
        });

        const updatedSearchForm = updateObject(this.state.search, {
            [inputIdentifier] : updatedSearchElement
        });

        let search_valid = false;
        if(this.state.search['keyword'] !='' || this.state.search['user'] !='' || this.state.search['language']!='') {
            search_valid = true
        }


        this.setState({search: updatedSearchForm, search_valid: search_valid});
    }

    searchHandler = (event) => {
        event.preventDefault();
        if(!this.state.search_valid) return;
        const formData = {};
        formData['keyword'] = this.state.search['keyword'].value;
        formData['user'] = this.state.search['user'].value;
        formData['language'] = this.state.search['language'].value;
        axios.get(process.env.REACT_APP_API_URL + 'search?keyword=' + formData['keyword'] + '&user=' + formData['user'] + '&language=' + formData['language'])
            .then(response => {
                let repos = [];
                for(let tmpRepo in response.data['repositories']) {
                    let repo = [];
                    repo['name'] = response.data['repositories'][tmpRepo].name;
                    repo['description'] = response.data['repositories'][tmpRepo]['description'];
                    repo['pushed'] = response.data['repositories'][tmpRepo]['pushed_at'];
                    repo['open_issues'] = response.data['repositories'][tmpRepo]['open_issues'];
                    repo['language'] = response.data['repositories'][tmpRepo]['language'];
                    repo['url'] = response.data['repositories'][tmpRepo]['url'];
                    repos.push(repo);
                }
                this.setState({repos: repos});
                })
                .catch(error => {
                    console.log('error');
                });
    }

    render() {
        let table = '';
        if(this.state.repos !== null && this.state.repos && this.state.repos[0]) {
            table = <SimpleTable rows={this.state.repos} />
        }
        return (
            <React.Fragment>
                <h1>Search</h1>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <form onSubmit={this.searchHandler}>
                        <Input
                            key="keyword"
                            label="Keyword"
                            elementtype='input'
                            value={this.state.search['keyword'].value}
                            changed={(event) => this.inputChangedHandler(event, 'keyword')}
                        />

                        <Input
                            key="user"
                            label="User"
                            elementtype='input'
                            value={this.state.search.user.value}
                            changed={(event) => this.inputChangedHandler(event, 'user')}
                        />
                        <Input
                            key="language"
                            label="Language"
                            elementtype='input'
                            value={this.state.search.language.value}
                            changed={(event) => this.inputChangedHandler(event, 'language')}
                        />
                        <Button btnType="Danger" clicked={this.searchHandler} disabled={!this.state.search_valid}>Search</Button>
                    </form>
                </div>
                <CssBaseline />
                { table }
            </React.Fragment>
        );
    }
}

export default Search;