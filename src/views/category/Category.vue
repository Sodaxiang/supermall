<template>
    <div class="wrapper" ref="aaa">
       <ul>
           <button @click="btnClcik">点击</button>
           <li>li1</li>
           <li>li2</li>
           <li>li3</li>
           <li>cvbli4</li>
           <li>li5</li>
           <li>li6</li>
           <li>li7</li>
           <li>li8</li>
           <li>li9</li>
           <li>li10</li>
           <li>li11</li>
           <li>li12</li>
           <li>li13</li>
           <li>li14</li>
           <li>li15</li>
           <li>li16</li>
           <li>li17</li>
           <li>li18</li>
           <li>li19</li>
           <li>li20</li>
           <li>li21</li>
           <li>li22</li>
           <li>li23</li>
           <li>li24</li>
           <li>li25</li>
           <li>li26</li>
           <li>li27</li>
           <li>li28</li>
           <li>li29</li>
           <li>li30</li>
           <li>li31</li>
           <li>li32</li>
           <li>li33</li>
           <li>li34</li>
           <li>li35</li>
           <li>li36</li>
           <li>li37</li>
           <li>li38</li>
           <li>li39</li>
           <li>li40</li>
           <li>li41</li>
           <li>li42</li>
           <li>li43</li>
           <li>li44</li>
           <li>li45</li>
           <li>li46</li>
           <li>li47</li>
           <li>li48</li>
           <li>li49</li>
           <li>li50</li>
           <li>li51</li>
           <li>li52</li>
           <li>li53</li>
           <li>li54</li>
           <li>li55</li>
           <li>li56</li>
           <li>li57</li>
           <li>li58</li>
           <li>li59</li>
           <li>li60</li>
           <li>li61</li>
           <li>li62</li>
           <li>li63</li>
           <li>li64</li>
           <li>li65</li>
           <li>li66</li>
           <li>li67</li>
           <li>li68</li>
           <li>li69</li>
           <li>li70</li>
           <li>li71</li>
           <li>li72</li>
           <li>li73</li>
           <li>li74</li>
           <li>li75</li>
           <li>li76</li>
           <li>li77</li>
           <li>li78</li>
           <li>li79</li>
           <li>li80</li>
       </ul>
    </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
    name: 'Category',
    data() {
        return {
            scroll: null,
        }
    },
   mounted() {
        this.scroll = new BScroll(this.$refs.aaa, {
            probeType: 3,
            pullUpLoad: true
        });
        this.scroll.on('scroll', position =>{
            // console.log(position);
        } );
        this.scroll.on('pullingUp', ()=> {
            console.log("浇在更多")
        })
   },
    created() {
    },
    methods:{
        btnClcik(){
            console.log("点我我")
        }
    }
    
}
</script>
<style scoped>
.wrapper {
    height: 200px;
    background: brown;
    overflow: hidden;
}
ul{
    /* height: 200px; */
    /* overflow-y: scroll; */
    /* background: brown; */
}
</style>

