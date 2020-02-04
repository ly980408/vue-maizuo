<template>
    <nav>
        <ul>
            <router-link to="/films" tag="li" activeClass="myactive">
                <span class="iconfont icon-dianying"></span>
                电影
            </router-link>
            <router-link to="/cinemas" tag="li" activeClass="myactive">
                <span class="iconfont icon-yingyuan"></span>
                影院
            </router-link>
            <router-link to="/center" tag="li" activeClass="myactive">
                <span class="iconfont icon-shequ"></span>
                我的
            </router-link>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
    .myactive{
        color: red;
    }
    nav{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background: white;
        z-index: 9;
        border-top: 1px solid #ededed;
        ul{
            display: flex;
            li{
                flex: 1;
                line-height: 50px;
                text-align: center;
                span{
                    font-size: 24px;
                }
            }
        }
    }
</style>
