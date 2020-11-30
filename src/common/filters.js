import moment from 'moment';
import Vue from 'vue';

Vue.filter('nullFilter', function (value) {
    if (!value) return '-'
    return value;
  });
  
Vue.filter('formatDate', function(value, format) {
    const defFormat = 'MMMM Do YYYY, h:mm a';
    if (value) {
        if(!format) format = defFormat;
        return moment(String(value)).format(format);
    }
});

Vue.filter('formatNumber', function (value) {
    if (!value) {
      value = 0;
    }
    return Number(value).toLocaleString();
  });
