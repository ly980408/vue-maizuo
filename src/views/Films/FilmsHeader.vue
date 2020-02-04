<template>
    <div>
        <ul>
            <router-link to="/films/nowplaying" tag="li" activeClass="active">正在热映</router-link>
            <router-link to="/films/comingsoon" tag="li" activeClass="active">即将上映</router-link>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
div{
    z-index: 9;
    ul{
        display: flex;
        background: white;
        li{
            flex:1;
            height: 40px;
            line-height: 40px;
            text-align: center;
        }
    }
    .active{
        color: red;
        border-bottom: 2px solid red;
    }
    .fixed{
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
    }
}
</style>
