import React from 'react';
import Chart from '../Chart';
import {
  archive_chats_parameters,
  charts_parameters,
  exchange_charts_parameters,
  market_chart_parameters
} from '../../game/knowledge/charts';
import _ from 'lodash';

let ChartsController = props => {
  let type = props.chart ? props.chart.type : 'default';
  let text = props.chart ? props.chart.name : 'Game statistics';
  let labels = [];
  let datasets = [];
  let options = {};

  switch (type) {
    case 'btc':
      const btc_statistic = props.data.exchange_statistics.btc;

      labels = Object.keys(props.data.exchange_statistics.btc.values);

      datasets.push({
        data: btc_statistic.values,
        label: exchange_charts_parameters.btc.label,
        borderColor: exchange_charts_parameters.btc.color,
        fill: false,
        radius: 0
      });

      options = {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      };

      break;

    case 'share0':
      const share0_statistic = props.data.exchange_statistics.share0;

      labels = Object.keys(props.data.exchange_statistics.share0.values);

      datasets.push({
        data: share0_statistic.values,
        label: exchange_charts_parameters.share0.label,
        borderColor: exchange_charts_parameters.share0.color,
        fill: false,
        radius: 0
      });

      options = {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      };

      break;
    case 'share1':
      const share1_statistic = props.data.exchange_statistics.share1;

      labels = Object.keys(props.data.exchange_statistics.share1.values);

      datasets.push({
        data: share1_statistic.values,
        label: exchange_charts_parameters.share1.label,
        borderColor: exchange_charts_parameters.share1.color,
        fill: false,
        radius: 0
      });

      options = {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        elements: {
          point: {
            radius: 0
          }
        }
      };

      break;
    case 'share2':
      const share2_statistic = props.data.exchange_statistics.share2;

      labels = Object.keys(props.data.exchange_statistics.share2.values);

      datasets.push({
        data: share2_statistic.values,
        label: exchange_charts_parameters.share2.label,
        borderColor: exchange_charts_parameters.share2.color,
        fill: false,
        radius: 0
      });

      options = {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      };

      break;

    case 'Archive':
      const archive = {
        deadlines: [],
        resolving_time: [],
        reward: [],
        resolving_time_percents: []
      };

      // reverse() becouse in data.project_archive_reports chunks is added by unshift() method
      // becouse the last project may be on top position in archive
      // but in chart last project may be on last poition
      let archive_reports = props.data.projects_archive_reports.reverse();

      let projects = archive_reports.filter(project => {
        return project.stage === 'finish';
      });

      labels = projects.map(project => {
        return project.name;
      });

      projects.forEach(project => {
        archive.deadlines.push(project.deadline_max);
        archive.resolving_time.push(project.deadline_max - project.deadline);
        archive.reward.push(project.reward);
        archive.resolving_time_percents.push(
          Math.round(
            (archive.resolving_time[archive.resolving_time.length - 1] /
              archive.deadlines[archive.deadlines.length - 1]) *
              100
          )
        );
      });

      _.mapValues(archive, (value, key) => {
        datasets.push({
          data: value,
          label: archive_chats_parameters[key].label,
          borderColor: archive_chats_parameters[key].color,
          fill: false
        });
      });

      break;

    case 'Market':
      const market_stats = {
        design: [],
        manage: [],
        program: [],
        total: []
      };

      props.chart.table_data.forEach((row, i) => {
        market_stats.design.push(row.design);
        market_stats.manage.push(row.manage);
        market_stats.program.push(row.program);
        market_stats.total.push(row.total);
        labels.push(`top ${i + 1}`);
      });

      _.mapValues(market_stats, (value, key) => {
        datasets.push({
          data: value,
          label: market_chart_parameters[key].label,
          borderColor: market_chart_parameters[key].color,
          fill: false
        });
      });

      break;

    default:
      options = {
        elements: {
          point: {
            radius: 0
          }
        },
        title: {
          display: true,
          text: props.data.text
        }
      };

      labels = Object.keys(props.data.statistics.money_spent.values);

      _.mapValues(props.data.statistics, (stats, key) => {
        datasets.push({
          data: stats.values,
          label: charts_parameters[key].label,
          borderColor: charts_parameters[key].color,
          fill: false
        });
      });
  }

  let data = {
    labels: labels,
    datasets: datasets,
    text: text,
    options: options
  };

  return <Chart data={data} />;
};

export default ChartsController;
