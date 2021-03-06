window.alert = function(name){
  let iframe = document.createElement("IFRAME");
  iframe.style.display="none";
  iframe.setAttribute("src", 'data:text/plain,');
  document.documentElement.appendChild(iframe);
  window.frames[0].window.alert(name);
  iframe.parentNode?.removeChild(iframe);
}

const $siteList = $(".siteList");
const $lastLi = $siteList.find(".last");
const x = localStorage.getItem('x')

const xObject = JSON.parse(x)

const hashMap = xObject || [
  {
    logo: "A",
    url: "https://www.acfun.cn"
  },
  {
    logo: "B",
    url: "https://www.bilibili.com",
  },
  {
    logo: "G",
    url: "https://www.google.com",
  },
  {
    logo: "T",
    url: "https://www.taobao.com/",
  },
  {
    logo: "I",
    url: "https://www.iqiyi.com/",
  },
  {
    logo: "Q",
    url: "https://www.qq.com/",
  },
  {
    logo: "S",
    url: "https://www.sina.com.cn/",
  },
];

const simplifyUrl = (url) => {
  return url.replace("https://","")
            .replace("http://","")
    .replace("www.", "")
    .replace(/\/.*/,"")
}

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node,index) => {
    const $li = $(`
    <li>
      <div class="site">
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-copy"></use>
          </svg>
        </div>
        <div class="logo">${node.logo[0]}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
      </div>
    </li>
    `).insertBefore($lastLi);
    $li.on('click', () => {
      window.open(node.url)
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation()
      hashMap.splice(index, 1)
      render()
    })
  })
}

render()


$(".addButton").on("click", () => {
  let url = prompt("请输入你想添加的网站：");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url,
  });
  render()
});

window.onbeforeunload = () => {
  let string = JSON.stringify(hashMap)
  localStorage.setItem('x',string)
}

$(document).on('keypress', (e) => {
  const { key } = e
  hashMap.forEach((item) => {
    if (item.logo.toLowerCase() === key) {
      window.open(item.url)
    }
  })
})
$('input').on('keypress', (e) => {
  e.stopPropagation()
})