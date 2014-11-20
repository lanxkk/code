/*将数据导出Excel*/
function exportExcel(tableid) {
    if ( !! +[1, ]) { //判断是否为IE
        alert("不是IE浏览器，不支持此方法！");
        return;
    }
    var curTbl = document.getElementById(tableid),
        /*
         * 如果IE浏览器报错：SCRIPT429: Automation 服务器不能创建对象
         * 打开Internet Explorer “工具”菜单栏中的“选项”一栏，单击“安全”栏中的“自定义级别”选项卡，
         * 将第三项“对没有标记为安全的activex控件进行初始化和脚本运行”设置成“启用”即可
         * */
        oXL = new ActiveXObject("Excel.Application"),
        oWB = oXL.Workbooks.Add(), //创建AX对象excel
        xlsheet = oWB.Worksheets(1), //获取workbook对象
        sel = document.body.createTextRange(); //激活当前sheet
    sel.moveToElementText(curTbl); //把表格中的内容移到TextRange中
    sel.select(); //全选TextRange中内容
    sel.execCommand("Copy"); //复制TextRange中内容
    xlsheet.Paste(); //粘贴到活动的EXCEL中
    oXL.Visible = true; //设置excel可见属性
    try {
        var fname = oXL.Application.GetSaveAsFilename("save.xls", "Excel Spreadsheets (*.xls), *.xls");
    } catch (error) {
        print("Nested catch caught " + error);
    } finally {
        if (fname) {
            oWB.SaveAs(fname);
            oWB.Close(savechanges = false);
            oXL.Quit();
            oXL = null;
        } else {
            alert("导出失败");
        }
        window.setTimeout(function() { //结束excel进程，退出完成
            CollectGarbage();
        }, 1);
    }
}
/*导出表格*/
document.getElementById("exportExcel").onclick = function() {
    exportExcel("tableExcels");
}